import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as UserService from "../Users/userService";
import { compare } from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required" });
    }

    const user = await UserService.findUserByEmail(email); 

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, type: user.type },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(500).send({ message: "Error during login", error });
  }
}
