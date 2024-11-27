import { Request, Response } from "express";
import * as UserController from "../src/modules/Users/userController";
import * as UserService from "../src/modules/Users/userService";
import { ObjectId } from "mongodb";
import { UserType } from "../src/types/userType";

jest.mock("../src/modules/Users/userService");

describe("UserController", () => {
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

  describe("findAllUsers", () => {
    it("should return a list of users", async () => {
      const mockUsers = [
        { id: new ObjectId(), username: "testuser1", email: "test1@mail.com" },
        { id: new ObjectId(), username: "testuser2", email: "test2@mail.com" },
      ];
      (UserService.findAllUsersService as jest.Mock).mockResolvedValue(mockUsers);

      await UserController.findAllUsers(req as Request, res as Response);

      expect(UserService.findAllUsersService).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith(mockUsers);
    });

    it("should return 404 if no users are found", async () => {
      (UserService.findAllUsersService as jest.Mock).mockResolvedValue([]);

      await UserController.findAllUsers(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(sendMock).toHaveBeenCalledWith({ message: "No users found" });
    });

    it("should return 400 on error", async () => {
      (UserService.findAllUsersService as jest.Mock).mockRejectedValue(new Error());

      await UserController.findAllUsers(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Bad request at function findAllUsers",
      });
    });
  });

  describe("createUser", () => {
    it("should create a user successfully", async () => {
      const mockUser: UserType = {
        id: new ObjectId(),
        username: "newuser",
        email: "newuser@mail.com",
        password: "password123",
      };
      (UserService.createUserService as jest.Mock).mockResolvedValue(mockUser);

      req.body = {
        username: "newuser",
        email: "newuser@mail.com",
        password: "password123",
      };

      await UserController.createUser(req as Request, res as Response);

      expect(UserService.createUserService).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(sendMock).toHaveBeenCalledWith({
        message: "User created successfully",
        data: mockUser,
      });
    });

    it("should return 400 for invalid user data", async () => {
      req.body = { username: "newuser", email: "invalid@mail.com" }; // Missing password

      await UserController.createUser(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Bad request at function createUser",
      });
    });

    it("should return 405 on service error", async () => {
      req.body = {
        username: "newuser",
        email: "newuser@mail.com",
        password: "password123",
      };
      (UserService.createUserService as jest.Mock).mockRejectedValue(new Error());

      await UserController.createUser(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(405);
      expect(sendMock).toHaveBeenCalledWith({
        message: "createUser function not allowed",
      });
    });
  });
});
