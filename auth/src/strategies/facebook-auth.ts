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
      profileFields: ['picture.type(large)', 'name'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, last_name, first_name } = profile._json;
      const photo = profile.photos
        ? profile.photos[0].value
        : 'poner foto default';

      const existingUser = await User.findOne({ providerId: id });

      if (!existingUser) {
        const user = User.build({
          providerId: id,
          nameAuthProvider: AuthProvider.Facebook,
          createDate: new Date().toISOString(),
        });
        await user.save();
      } else {
      }
      return done(null, { data: { id, photo, first_name, last_name } });
    }
  )
);
