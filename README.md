# Password Vault

Password Vault is a web application that allows users to securely store their website login details. It is built with Next.js, chakra-ui, typegoose, tanstack/react-query, typescript, fastify, argon2, and crypto-js. This was made to practice data encryption

## Features

- **Login**: Users can login to their account using their email and password.

- **Register**: Users can create a new account by providing their name, email, and a strong password.
- **Store website login details**: Users can add their website login details to the vault. The website login details are encrypted using AES256 and are only decrypted on the client-side.
- **Decryption and encryption on the client-side**: All data is encrypted using AES256 and is only decrypted on the client-side. The encrypted data is stored in the database.
- **Various hashing and encryption strategies**: The application uses SHA256, Argon2, pbkdf2 to generate the vault key, and AES256 to encrypt and decrypt the vault.

## What I learned

- Various hashing and encryption strategies such as SHA256, Argon2, pbkdf2, and AES256.
- How password managers work.
- How to use useMutation, useQuery, and react hook forms.

---

# Getting started

## Prerequisites

- Node.js
- Yarn
- MongoDB

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/HartJN/password-vault.git
   ```

2. **Change into the server directory:**

   ```bash
   cd server
   ```

3. **Install the dependencies:**

   ```bash
   yarn
   ```

4. **Change into the client directory:**

   ```bash
   cd ../client
   ```

5. **Install the dependencies:**

   ```bash
   yarn
   ```

6. **Generate public and private keys using**

   `https://travistidwell.com/jsencrypt/demo/`

7. **Add the generated keys to private.key and public.key in the certs folder.**

8. **Make sure you have MongoDB running locally.**

9. **Start the server:**

   ```bash
   cd ../server && yarn dev
   ```

10. **Start the client:**

    ```bash
    cd ../client && yarn dev
    ```

11. Open `http://localhost:3000` in your web browser.
