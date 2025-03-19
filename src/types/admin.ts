
export interface CardData {
  id: number;
  nome: string;
  matricula: string;
  data: string;
  status: string;
  valor: string;
  tipo: string;
}

export interface TransactionData {
  id: number;
  cliente: string;
  valor: string;
  data: string;
  status: string;
  metodo: string;
}

export interface CardDataWithPhoto extends CardData {
  primeiroNome?: string;
  cargo: string;
  setor: string;
  validade: string;
  foto: boolean;
  editMode?: boolean;
  fotoUrl?: string;
}

export interface SpreadsheetTemplate {
  id: number;
  primeiroNome: string;
  nome: string;
  matricula: string;
  cargo: string;
  setor: string;
  validade: string;
  tipo: string;
  foto?: string;
}

export interface CropDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCropComplete: (croppedImageUrl: string) => void;
  imageUrl: string | null;
  cardType?: 'Light' | 'Conecta';
  employeeName?: string;
  employeeId?: string;
  employeeRole?: string;
}

export interface CardType {
  value: string;
  label: string;
}

export interface UploadedEmployee {
  id: number;
  nome: string;
  matricula: string;
  cargo: string;
  setor: string;
  validade: string;
  tipo: string;
  foto?: boolean;
  fotoUrl?: string;
}

export interface PhotoCropTabProps {
  uploadedEmployees: UploadedEmployee[];
  showUploadedData: boolean;
  selectedCardType: string;
  onSubmitOrder: () => void;
}

export interface NewEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (employee: Omit<UploadedEmployee, 'id'>) => void;
}
