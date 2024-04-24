import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const {web3} = require('../ethereum/web3');
const receiptJson = require('../ethereum/receipt-ganache.json');
const contract = require('../ethereum/build/ComplaintSystem.json');

const prisma = new PrismaClient();

const getContractObject = () => {
    const contractObject = new web3.eth.Contract(
        receiptJson.jsonInterface,
        receiptJson.address
    );

    return contractObject;
}

export const register = async (req: Request, res: Response) => {
    const { email, name, password, walletAddress, isAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const contractObject = getContractObject();
    try {
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                walletAddress,
                isAdmin,
            },
        });
        if(isAdmin) {
            const receipt = await contractObject.methods.registerAdmin(walletAddress).send({from: walletAddress});
            console.log(receipt);
        } else {
            const receipt = await contractObject.methods.registerUser(walletAddress).send({from: walletAddress});
            console.log(receipt);
        }
        res.json(user);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
    }
    const isValid = await bcrypt.compare(password, user.password || '');
    if (!isValid) {
        return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
    res.json({ token, user });
};