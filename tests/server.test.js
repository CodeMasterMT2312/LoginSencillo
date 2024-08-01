const request = require('supertest');
const { server, db } = require('../server'); // Ajusta la ruta según la estructura del proyecto

afterAll((done) => {
    // Cierra la conexión a la base de datos
    db.end((err) => {
        if (err) {
            console.error("Error al cerrar la conexión a la base de datos:", err);
        }
        // Cierra el servidor
        server.close(done);
    });
});

describe('POST /login', () => {
    it('responds with success on valid credentials', async () => {
        // Asegúrate de que estas credenciales existan en tu base de datos
        const response = await request(server)
            .post('/login')
            .send({ username:"agusmaty23@gmail.com", password:"mathias2312"});
        expect(response.statusCode).toEqual(302); // Redirección HTTP
        expect(response.headers.location).toBe('/menu.html'); // Verifica la redirección
    });

    it('responds with error on invalid credentials', async () => {
        const response = await request(server)
            .post('/login')
            .send({ username: 'wrong@example.com', password: 'wrongpassword' });
        expect(response.statusCode).toEqual(400); // Credenciales incorrectas
        expect(response.text).toContain('Credenciales incorrectas');
    });
});
