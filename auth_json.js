const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const USERS_FILE = path.join(__dirname, '../../../data/users.json');

// Fallback JSON auth service
async function register(user) {
    try {
        const users = JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
        
        const hash = bcrypt.hashSync(user.password, 10);
        const newUser = {
            id: Date.now(),
            nom: user.nom,
            email: user.email,
            password: hash,
            age: user.age || 0
        };
        
        users.push(newUser);
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
        
        return { message: "Utilisateur créé (JSON)", userId: newUser.id };
    } catch (err) {
        throw new Error('Erreur création utilisateur JSON: ' + err.message);
    }
}

async function login(email, password) {
    try {
        const users = JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
        const user = users.find(u => u.email === email);
        
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return null;
        }
        
        return { id: user.id, nom: user.nom, email: user.email };
    } catch (err) {
        throw new Error('Erreur login JSON: ' + err.message);
    }
}

module.exports = { register, login };

