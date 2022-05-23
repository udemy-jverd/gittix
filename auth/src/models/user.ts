import mongoose from 'mongoose';
import { Password } from '../services/password';

// describes the properties that are required to create a new User
interface userAttrs {
    email: string;
    password: string;
}

// describes the properties that a User Model has
interface userModel extends mongoose.Model<userDoc> {
    build(attrs: userAttrs): userDoc;
}

// describes the properties that a User Document has
interface userDoc extends mongoose.Document {
    email: string;
    password: string;
    // createdAt, updatedAt, ...
}

const userSchema = new mongoose.Schema({
    email: {
        type: String, // Specific to mongoose and not to Typescript
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Middleware function given by mongoose
userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

// Create a custom function build in in our model
// Allow us to call User.build({ email: '', password: '' });
// Benefit: a single export in the model (User) and a Typescript check on User creation
userSchema.statics.build = (attrs: userAttrs) => new User(attrs);

const User = mongoose.model<userDoc, userModel>('User', userSchema);

export { User };
