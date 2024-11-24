import { ObjectId } from 'mongodb';
import { titrationEnum } from './titrationEnum';

export type ProfessorType = {
  id: ObjectId;             
  name: string;               
  email: string;                      
  titration: titrationEnum;       
  coursesId: ObjectId[];      
  unitId?: string;         
  reference: string;         
  lattes: string;             
  activityStatus: string;    
  notes: string;              
};


