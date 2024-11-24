import { Request, Response } from "express";
import * as ProfessorController from "../src/modules/Professors/professorController";
import * as ProfessorService from "../src/modules/Professors/professorService";
import { ObjectId } from "mongodb";
import { ProfessorType } from "../src/types/professorType";
import { titrationEnum } from "../src/types/titrationEnum";

jest.mock("../src/modules/Professors/professorService");

describe("ProfessorController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    sendMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ send: sendMock });
    req = {};
    res = { status: statusMock, send: sendMock };
  });

  describe("findAllProfessors", () => {
    it("should return a list of professors", async () => {
      const mockProfessors = [
        { id: new ObjectId(), name: "Professor A", email: "profA@example.com" },
        { id: new ObjectId(), name: "Professor B", email: "profB@example.com" },
      ];
      (ProfessorService.findAllProfessorsService as jest.Mock).mockResolvedValue(mockProfessors);

      await ProfessorController.findAllProfessors(req as Request, res as Response);

      expect(ProfessorService.findAllProfessorsService).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith(mockProfessors);
    });

    it("should return 404 if no professors are found", async () => {
      (ProfessorService.findAllProfessorsService as jest.Mock).mockResolvedValue([]);

      await ProfessorController.findAllProfessors(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(sendMock).toHaveBeenCalledWith({ message: "No professors found" });
    });

    it("should return 500 on service error", async () => {
      (ProfessorService.findAllProfessorsService as jest.Mock).mockRejectedValue(new Error());

      await ProfessorController.findAllProfessors(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Error when searching for professors",
      });
    });
  });

  describe("findProfessorById", () => {
    it("should return a professor by ID", async () => {
      const mockProfessor = {
        id: new ObjectId(),
        name: "Professor A",
        email: "profA@example.com",
      };
      (ProfessorService.findByIdService as jest.Mock).mockResolvedValue(mockProfessor);

      req.params = { id: mockProfessor.id.toHexString() };

      await ProfessorController.findProfessorById(req as Request, res as Response);

      expect(ProfessorService.findByIdService).toHaveBeenCalledWith(mockProfessor.id);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith(mockProfessor);
    });

    it("should return 400 for invalid ObjectId", async () => {
      req.params = { id: "invalid-id" };

      await ProfessorController.findProfessorById(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Invalid ObjectId format",
      });
    });

    it("should return 404 if professor is not found", async () => {
      req.params = { id: new ObjectId().toHexString() };

      (ProfessorService.findByIdService as jest.Mock).mockResolvedValue(null);

      await ProfessorController.findProfessorById(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(sendMock).toHaveBeenCalledWith({ message: "Professor not found" });
    });

    it("should return 500 on service error", async () => {
      req.params = { id: new ObjectId().toHexString() };

      (ProfessorService.findByIdService as jest.Mock).mockRejectedValue(new Error());

      await ProfessorController.findProfessorById(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Error when searching for professor",
      });
    });
  });

  describe("createProfessor", () => {
    it("should create a professor successfully", async () => {
      const mockProfessor: ProfessorType = {
        id: new ObjectId(),
        name: "Professor A",
        email: "profA@example.com",
        titration: titrationEnum.DOCTOR,
        coursesId: [new ObjectId()],
        unitId: "unit-1",
        reference: "prof-a-ref",
        lattes: "prof-a-lattes",
        activityStatus: "active",
        notes: "Top performer",
      };

      (ProfessorService.createProfessorService as jest.Mock).mockResolvedValue(mockProfessor);

      req.body = mockProfessor;

      await ProfessorController.createProfessor(req as Request, res as Response);

      expect(ProfessorService.createProfessorService).toHaveBeenCalledWith(mockProfessor);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Professor successfully created",
        data: mockProfessor,
      });
    });

    it("should return 400 for missing fields", async () => {
      req.body = { email: "profA@example.com" }; // Missing required fields

      await ProfessorController.createProfessor(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Missing required fields",
      });
    });

    it("should return 500 on service error", async () => {
      req.body = {
        name: "Professor A",
        email: "profA@example.com",
        titration: titrationEnum.DOCTOR,
      };

      (ProfessorService.createProfessorService as jest.Mock).mockRejectedValue(new Error());

      await ProfessorController.createProfessor(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(sendMock).toHaveBeenCalledWith({ message: "Error creating professor" });
    });
  });

  describe("updateProfessor", () => {
    it("should update a professor successfully", async () => {
      const updatedProfessor = {
        id: new ObjectId(),
        name: "Updated Professor",
        email: "updated@example.com",
      };

      (ProfessorService.updateProfessorService as jest.Mock).mockResolvedValue(updatedProfessor);

      req.params = { id: updatedProfessor.id.toHexString() };
      req.body = { name: "Updated Professor", email: "updated@example.com" };

      await ProfessorController.updateProfessor(req as Request, res as Response);

      expect(ProfessorService.updateProfessorService).toHaveBeenCalledWith(
        new ObjectId(updatedProfessor.id),
        req.body
      );
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Professor updated successfully",
        data: updatedProfessor,
      });
    });

    it("should return 400 for invalid ObjectId", async () => {
      req.params = { id: "invalid-id" };
      req.body = { name: "Invalid Update" };

      await ProfessorController.updateProfessor(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Invalid ObjectId format",
      });
    });

    it("should return 404 if professor is not found", async () => {
      req.params = { id: new ObjectId().toHexString() };
      req.body = { name: "Non-existent Professor" };

      (ProfessorService.updateProfessorService as jest.Mock).mockResolvedValue(null);

      await ProfessorController.updateProfessor(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Professor not found for update",
      });
    });
  });

  describe("deleteProfessor", () => {
    it("should delete a professor successfully", async () => {
      const mockResult = { affected: 1 };
      req.params = { id: new ObjectId().toHexString() };

      (ProfessorService.deleteProfessorByIdService as jest.Mock).mockResolvedValue(mockResult);

      await ProfessorController.deleteProfessor(req as Request, res as Response);

      expect(ProfessorService.deleteProfessorByIdService).toHaveBeenCalledWith(
        new ObjectId(req.params.id)
      );
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({ message: "Professor deleted successfully" });
    });

    it("should return 404 if professor is not found", async () => {
      req.params = { id: new ObjectId().toHexString() };
      const mockResult = { affected: 0 };

      (ProfessorService.deleteProfessorByIdService as jest.Mock).mockResolvedValue(mockResult);

      await ProfessorController.deleteProfessor(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Professor not found for deletion",
      });
    });

    it("should return 400 for invalid ObjectId", async () => {
      req.params = { id: "invalid-id" };

      await ProfessorController.deleteProfessor(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Invalid ObjectId format",
      });
    });
  });
});
