import { sign } from 'jsonwebtoken'
import AppError from "core/classes/errorHandler";
import firebaseConfig from 'assets/firebase-admin.json'

export class FirebaseAuth {
    constructor() { }

    async execute(userId: string) {
        try {
            const now = Math.floor(Date.now() / 1000)

            const payload = {
                iss: firebaseConfig.client_email,
                sub: firebaseConfig.client_email,
                aud: "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
                iat: now,
                exp: now + (60 * 60),
                uid: userId,
            }

            const firebase_token = sign(
                payload,
                firebaseConfig.private_key,
                {
                    algorithm: 'RS256'
                }
            )

            return { firebase_token }
        } catch (error) {
            throw new AppError(error.message)
        }
    }
}