const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const USERS_FILE = path.join(__dirname, '../../../data/users.json');
const HABITANTS_FILE = path.join(__dirname, '../../../data/habitants.json');
const ADMINS_FILE = path.join(__dirname, '../../../data/admins.json');

function normalizeUsers(data) {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : Object.values(parsed);
}

// INSCRIPTION
async function register(user) {
    try {
        const data = await fs.readFile(USERS_FILE, 'utf8').catch(() => '[]');
        const users = normalizeUsers(data);
        
        // Check if email exists
        if (users.find(u => u.email === user.email)) {
            throw new Error('Email déjà utilisé');
        }
        
        const hash = bcrypt.hashSync(user.password, 10);
        const newUser = {
            id: Date.now(),
            nom: user.nom,
            email: user.email,
            password: hash,
            age: user.age || 0,
            date: new Date().toISOString()
        };
        
        users.push(newUser);
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
        
        return {
            message: "Utilisateur créé avec succès",
            userId: newUser.id
        };
    } catch (err) {
        throw new Error('Erreur création utilisateur: ' + err.message);
    }
}

// LOGIN classique (email/password)
async function login(email, password) {
    try {
        const data = await fs.readFile(USERS_FILE, 'utf8').catch(() => '[]');
        const users = normalizeUsers(data);
        
        const user = users.find(u => u.email === email);
        
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return null;
        }
        
        return {
            id: user.id,
            nom: user.nom,
            email: user.email
        };
    } catch (err) {
        throw new Error('Erreur login: ' + err.message);
    }
}

// LOGIN HABITANT (nom + quartier_id + password initial)
async function loginHabitant(nom, password, quartier_id) {
    try {
        const data = await fs.readFile(HABITANTS_FILE, 'utf8').catch(() => '{}');
        const habitants = JSON.parse(data);
        
        // Chercher l'habitant par nom ET quartier_id
        const habitant = Object.values(habitants).find(
            h => h.nom === nom && h.quartier_id == quartier_id
        );
        
        if (!habitant || habitant.password !== password) {
            return null;
        }
        
        return {
            id: habitant.id,
            nom: habitant.nom,
            quartier_id: habitant.quartier_id,
            role: 'citoyen'
        };
    } catch (err) {
        throw new Error('Erreur login habitant: ' + err.message);
    }
}

// LOGIN ADMIN (nom + quartier_id + password)
async function loginAdmin(nom, password, quartier_id) {
    try {
        const data = await fs.readFile(ADMINS_FILE, 'utf8').catch(() => '[]');
        const admins = normalizeUsers(data);
        
        const admin = admins.find(
            a => a.nom === nom && a.quartier_id == quartier_id
        );
        
        if (!admin || admin.password !== password) {
            return null;
        }
        
        return {
            id: admin.id,
            nom: admin.nom,
            quartier_id: admin.quartier_id,
            role: 'admin'
        };
    } catch (err) {
        throw new Error('Erreur login admin: ' + err.message);
    }
}

module.exports = { register, login, loginHabitant, loginAdmin };

