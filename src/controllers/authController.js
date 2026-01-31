import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import { setSessionCookie, createSession } from '../services/auth.js';
import { Session } from '../models/session.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const newSession = await createSession(newUser._id);
  setSessionCookie(res, newSession);

  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid credentials');
  }
  await Session.deleteOne({ userId: user._id });
  const newSession = await createSession(user._id);
  setSessionCookie(res, newSession);

  res.status(200).json(user);
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshSession = async (req, res) => {
  const session = await Session.findOne({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found.');
  }
  const isSessionExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionExpired) {
    throw createHttpError(401, 'Session token expired.');
  }

  await Session.deleteOne({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  const newSession = await createSession(session.userId);
  setSessionCookie(res, newSession);

  res.status(200).json({ message: 'Successfully refreshed a session!' });
};
