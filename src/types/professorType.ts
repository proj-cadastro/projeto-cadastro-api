import { ObjectId } from 'mongodb';
import { titrationEnum } from './titrationEnum';
import { activityStatusEnum } from './activityStatusEnum';

export type ProfessorType = {
  id?: ObjectId;             
  name: string;               
  email: string;                      
  titration: titrationEnum;       
  coursesId: ObjectId[];      
  unitId?: string;         
  reference: string;         
  lattes: string;             
  activityStatus: activityStatusEnum;    
  notes: string;              
};


