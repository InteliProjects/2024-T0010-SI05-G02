import express from 'express';
import { spawn } from 'child_process';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static('public'));

app.post('/set-key-and-deploy', (req, res) => {
    const { privateKey, password } = req.body;
    process.env.SEPOLIA_PRIVATE_KEY = privateKey;

    if (password === process.env.PASSWORD) {
        const command = 'npx hardhat ignition deploy ./ignition/modules/ContratoTempus.ts --network sepolia';
        const deployProcess = spawn(command, [], { shell: true });
    
        deployProcess.stdin.write('y\n');
        deployProcess.stdin.end();
    
        let outputData = '';
        let errorData = '';
    
        deployProcess.stdout.on('data', (data) => {
            outputData += data.toString();
        });
    
        deployProcess.stderr.on('data', (data) => {
            errorData += data.toString();
        });
    
        deployProcess.on('close', (code) => {
            if (code === 0) {
                res.send(`Deploy successful:\n${outputData}`);
            } else {
                console.error(`Deploy failed with code ${code} and error: ${errorData}`);
                res.status(500).send(`Deploy failed with code ${code} and error: ${errorData}`);
            }
        });
    
        deployProcess.on('error', (err) => {
            console.error('Erro ao iniciar o processo:', err);
            res.status(500).send(`Error on spawn: ${err}`);
        });
    } else {
        res.status(500).send("Password Invalido")
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
