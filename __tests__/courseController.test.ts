import { Request, Response } from "express";
import * as CourseController from "../src/modules/Courses/courseController";
import * as CourseService from "../src/modules/Courses/courseService";
import { ObjectId } from "mongodb";
import { CourseType } from "../src/types/courseType";
import { CourseEnum } from "../src/types/courseEnum";
import { titrationEnum } from "../src/types/titrationEnum";

jest.mock("../src/modules/Courses/courseService");

describe("CourseController", () => {
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

  describe("findAllCourses", () => {
    it("should return a list of courses", async () => {
      const mockCourses = [
        { id: new ObjectId(), name: "Course 1", codCourse: "C1", model: CourseEnum.INPERSON },
        { id: new ObjectId(), name: "Course 2", codCourse: "C2", model: CourseEnum.BLENDED },
      ];
      (CourseService.findAllCourseService as jest.Mock).mockResolvedValue(mockCourses);

      await CourseController.findAllCourses(req as Request, res as Response);

      expect(CourseService.findAllCourseService).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith(mockCourses);
    });

    it("should return 404 if no courses are found", async () => {
      (CourseService.findAllCourseService as jest.Mock).mockResolvedValue([]);

      await CourseController.findAllCourses(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(sendMock).toHaveBeenCalledWith({ message: "No courses found" });
    });

    it("should return 400 on error", async () => {
      (CourseService.findAllCourseService as jest.Mock).mockRejectedValue(new Error());

      await CourseController.findAllCourses(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Bad request at function findAllCourses",
      });
    });
  });

  describe("createCourse", () => {
    it("should create a course successfully", async () => {
      const mockCourse: CourseType = {
        name: "New Course",
        codCourse: "NC1",
        model: CourseEnum.INPERSON,
        initialism: "NC",
        subjects: ["Math", "Science"],
        professors: [
          {
            id: new ObjectId(),
            name: "Professor A",
            email: "profA@example.com",
            titration: titrationEnum.DOCTOR,
            coursesId: [new ObjectId()],
            reference: "prof-a-ref",
            lattes: "prof-a-lattes",
            activityStatus: "active",
            notes: "Top performer",
          },
        ],
        coordinator: {
          id: new ObjectId(),
          name: "Professor B",
          email: "profB@example.com",
          titration: titrationEnum.MASTER,
          coursesId: [new ObjectId()],
          reference: "prof-b-ref",
          lattes: "prof-b-lattes",
          activityStatus: "active",
          notes: "Experienced coordinator",
        },
      };

      (CourseService.createCourseService as jest.Mock).mockResolvedValue(mockCourse);

      req.body = mockCourse;

      await CourseController.createCourse(req as Request, res as Response);

      expect(CourseService.createCourseService).toHaveBeenCalledWith(mockCourse);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(sendMock).toHaveBeenCalledWith({ message: "Course created successfully" });
    });

    it("should return 400 on service error", async () => {
      req.body = {
        name: "New Course",
        codCourse: "NC1",
        model: CourseEnum.INPERSON,
      };

      (CourseService.createCourseService as jest.Mock).mockRejectedValue(new Error());

      await CourseController.createCourse(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({ message: "Error creating course" });
    });
  });

  describe("updateCourse", () => {
    it("should update a course successfully", async () => {
      const updatedCourse = { id: new ObjectId(), name: "Updated Course", codCourse: "UC1" };

      (CourseService.updateCourseService as jest.Mock).mockResolvedValue(updatedCourse);

      req.params = { id: updatedCourse.id.toHexString() };
      req.body = { name: "Updated Course", codCourse: "UC1" };

      await CourseController.updateCourse(req as Request, res as Response);

      expect(CourseService.updateCourseService).toHaveBeenCalledWith(
        new ObjectId(updatedCourse.id),
        req.body
      );
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Course successfully updated.",
        course: updatedCourse,
      });
    });

    it("should return 404 if the course is not found", async () => {
      req.params = { id: new ObjectId().toHexString() };
      req.body = { name: "Non-existent Course" };

      (CourseService.updateCourseService as jest.Mock).mockResolvedValue(null);

      await CourseController.updateCourse(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Course not found or could not be updated",
      });
    });

    it("should return 400 for invalid course id", async () => {
      req.params = { id: "invalid-id" };
      req.body = { name: "Invalid ID Course" };

      await CourseController.updateCourse(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Course id or data not provided.",
      });
    });
  });

  describe("deleteCourse", () => {
    it("should delete a course successfully", async () => {
      const mockCourse = { id: new ObjectId(), name: "Course to Delete" };

      (CourseService.deleteCourseService as jest.Mock).mockResolvedValue(mockCourse);

      req.params = { id: mockCourse.id.toHexString() };

      await CourseController.deleteCourse(req as Request, res as Response);

      expect(CourseService.deleteCourseService).toHaveBeenCalledWith(new ObjectId(mockCourse.id));
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({
        message: "The course has been successfully deleted!",
      });
    });

    it("should return 404 if the course is not found", async () => {
      req.params = { id: new ObjectId().toHexString() };

      (CourseService.deleteCourseService as jest.Mock).mockResolvedValue(null);

      await CourseController.deleteCourse(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Course not found or could not be deleted.",
      });
    });

    it("should return 400 for invalid course id", async () => {
      req.params = { id: "invalid-id" };

      await CourseController.deleteCourse(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Course id not provided.",
      });
    });
  });
});
