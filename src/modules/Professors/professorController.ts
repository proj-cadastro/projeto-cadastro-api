import { Request, Response } from "express";
import * as ProfessorService from "./professorService";
import { ObjectId } from "mongodb";
import { ProfessorType } from "../../types/professorType";

export async function findAllProfessors(req: Request, res: Response) {
    try {
        const result = await ProfessorService.findAllProfessorsService();

        if (!result || result.length === 0) {
            return res.status(404).send({ message: "No professors found" });
        }

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ message: "Error when searching for professors" });
    }
}

export async function findProfessorById(req: Request, res: Response) {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid ObjectId format" });
        }

        const objectId = new ObjectId(id);
        const professor = await ProfessorService.findByIdService(objectId);

        if (!professor) {
            return res.status(404).send({ message: "Professor not found" });
        }

        return res.status(200).send(professor);
    } catch (error) {
        return res.status(500).send({ message: "Error when searching for professor" });
    }
}

export async function createProfessor(req: Request, res: Response) {
    try {
        const professorData: ProfessorType = req.body;

        if (!professorData.name || !professorData.email || !professorData.titration) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        const newProfessor = await ProfessorService.createProfessorService(professorData);

        return res.status(201).send({
            message: "Professor successfully created",
            data: newProfessor,
        });
    } catch (error) {
        return res.status(500).send({ message: "Error creating professor" });
    }
}

export async function updateProfessor(req: Request, res: Response) {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid ObjectId format" });
        }

        const objectId = new ObjectId(id);
        const data: Partial<ProfessorType> = req.body;

        const updatedProfessor = await ProfessorService.updateProfessorService(objectId, data);

        if (!updatedProfessor) {
            return res.status(404).send({ message: "Professor not found for update" });
        }

        return res.status(200).send({
            message: "Professor updated successfully",
            data: updatedProfessor,
        });
    } catch (error) {
        return res.status(500).send({ message: "Error updating professor" });
    }
}

export async function deleteProfessor(req: Request, res: Response) {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid ObjectId format" });
        }

        const objectId = new ObjectId(id);
        const result = await ProfessorService.deleteProfessorByIdService(objectId);

        if (result.affected === 0) {
            return res.status(404).send({ message: "Professor not found for deletion" });
        }

        return res.status(200).send({ message: "Professor deleted successfully" });
    } catch (error) {
        return res.status(500).send({ message: "Error deleting professor" });
    }
}
