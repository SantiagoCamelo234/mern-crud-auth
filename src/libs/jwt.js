import {SECRET_TOKEN }from '../config.js'
import jwt from 'jsonwebtoken'

export const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
          // Creacion del JWT
          payload,
          SECRET_TOKEN,
          {
            expiresIn: "31d",
          },
          (err, token) => {
            // Callback de ejecucion de forma asincrona
            if (err) reject(err);
            resolve(token)
          }
        );
    })
}


