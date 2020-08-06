import passport from 'passport';
import strategy from 'passport-facebook';
import { User, AuthProvider } from '../models/user';

const FacebookStrategy = strategy.Strategy;
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL!,
      profileFields: ['email', 'name'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id } = profile._json;
      const existingUser = await User.findOne({ providerId: id });

      if (!existingUser) {
        const user = User.build({
          providerId: id,
          nameAuthProvider: AuthProvider.Facebook,
          createDate: new Date().toISOString(),
        });
        await user.save();
      }
      return done(null, profile);
    }
  )
);
