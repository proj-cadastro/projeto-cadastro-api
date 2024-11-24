import { AppDataSource } from "../../data-source";
import { ProfessorEntity } from "./professorEntity";
import { ObjectId } from "mongodb";
import { ProfessorType } from "../../types/professorType";

const professorRepository = AppDataSource.getRepository(ProfessorEntity);

export async function findAllProfessorsService() {
    return await professorRepository.find();
}

export async function findByIdService(id: ObjectId) {
    return await professorRepository.findOneBy({ id });
}

export async function createProfessorService(professorData: ProfessorType) {
    const newProfessor = professorRepository.create(professorData);
    //newProfessor.id = new ObjectId(); 
    return await professorRepository.save(newProfessor);
}

export async function updateProfessorService(id: ObjectId, data: Partial<ProfessorType>) {
    await professorRepository.update({ id }, data);
    return await findByIdService(id); 
}

export async function deleteProfessorByIdService(id: ObjectId) {
    return await professorRepository.delete({ id });
}
