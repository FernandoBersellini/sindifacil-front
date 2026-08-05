export interface Associate {
  id: number;
  name: string;
  birthDate: Date;
  mothersName: string;
  fathersName: string;
  registrationNumber: string | null;
  storageKey: string | null;
  originalFilename: string | null;
  mimeType: string | null;
  uploadedAt: Date | null;
}

export interface CreateAssociateDTO {
  name: string;
  birthDate: Date;
  mothersName: string;
  fathersName: string;
}

export interface UpdateAssociateDTO {
  name?: string;
  birthDate?: Date;
  mothersName?: string;
  fathersName?: string;
  registrationNumber?: string;
}
