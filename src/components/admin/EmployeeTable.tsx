
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Camera, Trash } from "lucide-react";
import { UploadedEmployee } from '@/types/admin';
import EmployeeEditor from './EmployeeEditor';

interface EmployeeTableProps {
  employees: UploadedEmployee[];
  onDeleteEmployee: (id: number) => void;
  onOpenPhotoUploader: (employeeId: number) => void;
  onUpdateEmployee: (updatedEmployee: UploadedEmployee) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onDeleteEmployee,
  onOpenPhotoUploader,
  onUpdateEmployee
}) => {
  if (employees.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={5} className="text-center py-6 text-gray-500">
          Nenhum funcionário adicionado. Importe uma planilha para começar.
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {employees.map((employee) => (
        <TableRow key={employee.id} className="hover:bg-brand-primary/5">
          <TableCell className="font-medium">{employee.nome.split(' ')[0]}</TableCell>
          <TableCell>{employee.nome}</TableCell>
          <TableCell>
            <span className={`${employee.matricula.startsWith('3') ? 'text-brand-primary' : 'text-blue-600'} font-medium`}>
              {employee.matricula}
            </span>
          </TableCell>
          <TableCell>
            {employee.foto ? (
              <div className="flex items-center">
                <span className="text-green-600 font-medium mr-2">Sim</span>
                {employee.fotoUrl && (
                  <div className="h-6 w-6 rounded-full overflow-hidden border border-gray-200">
                    <img 
                      src={employee.fotoUrl} 
                      alt={`Foto de ${employee.nome}`}
                      className="h-full w-full object-cover" 
                    />
                  </div>
                )}
              </div>
            ) : (
              <span className="text-red-600 font-medium">Não</span>
            )}
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <EmployeeEditor 
                employee={employee}
                onSave={onUpdateEmployee}
                onPhotoUpload={() => onOpenPhotoUploader(employee.id)}
              />
              <Button 
                variant={employee.foto ? "outline" : "default"}
                size="sm"
                className={`h-8 text-xs ${!employee.foto ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                onClick={() => onOpenPhotoUploader(employee.id)}
              >
                <Camera className="h-3.5 w-3.5 mr-1" />
                {employee.foto ? 'Ver Foto' : 'Adicionar Foto'}
              </Button>
              <Button 
                variant="destructive" 
                size="icon"
                className="h-8 w-8"
                onClick={() => onDeleteEmployee(employee.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default EmployeeTable;
