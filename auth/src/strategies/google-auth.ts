import passport from 'passport';
import strategy from 'passport-google-oauth';
import { User, AuthProvider } from '../models/user';

const GoogleStrategy = strategy.OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      display: 'popup',
    },
    async (accessToken, refreshToken, profile, done) => {
      const { sub, name, picture } = profile._json;
      const existingUser = await User.findOne({ providerId: sub });

      if (!existingUser) {
        const user = User.build({
          providerId: sub,
          nameAuthProvider: AuthProvider.Google,
          createDate: new Date().toISOString(),
        });
        await user.save();
      }
      return done(null, {
        data: { id: sub, first_name: name, photo: picture },
      });
    }
  )
);
