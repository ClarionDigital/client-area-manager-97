
import { CardData, CardDataWithPhoto, UploadedEmployee } from '@/types/admin';

// Get card type based on employee ID
export const getCardTypeFromEmployeeId = (id: string): string => {
  if (id.startsWith('3')) return 'Light';
  if (id.startsWith('7')) return 'Conecta';
  return 'Light'; // Default fallback
};

// Create a new entry for link-filled form
export const createLinkFilledEntry = (employee: UploadedEmployee) => {
  return {
    id: Date.now(), // Use timestamp as unique ID
    nome: employee.nome,
    primeiroNome: employee.nome.split(' ')[0],
    matricula: employee.matricula,
    tipo: employee.tipo,
    foto: false,
    validade: employee.validade || "12/2024",
    cargo: employee.cargo || "",
    setor: employee.setor || "",
    // Add required fields with default values
    email: "",
    telefone: "",
    empresa: "",
    dataPreenchimento: new Date().toLocaleDateString(),
    linkId: ""
  };
};

// Export data as CSV
export const exportDataAsCSV = (
  data: any[], 
  headers: string[], 
  fieldMappings: Record<string, (item: any) => string>, 
  filename: string
) => {
  const headerRow = headers.join(',');
  
  const csvData = data.map(item => {
    return Object.keys(fieldMappings)
      .map(key => fieldMappings[key](item))
      .join(',');
  }).join('\n');
  
  const csvContent = `${headerRow}\n${csvData}`;
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Download template CSV
export const downloadTemplateCSV = (
  headers: string[],
  sampleData: string[],
  filename: string
) => {
  const headerRow = headers.join(',');
  const csvContent = `${headerRow}\n${sampleData.join('\n')}`;
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Paginate data
export const paginateData = (data: any[], currentPage: number, itemsPerPage: number) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  return data.slice(indexOfFirstItem, indexOfLastItem);
};

// Calculate progress percentage
export const calculateProgress = (completedSteps: number, totalSteps: number): number => {
  if (totalSteps === 0) return 0;
  return Math.round((completedSteps / totalSteps) * 100);
};

// Format date for display
export const formatDate = (dateString: string): string => {
  try {
    const parts = dateString.split('/');
    if (parts.length !== 3) return dateString;
    
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    const year = parts[2];
    
    return `${day}/${month}/${year}`;
  } catch (error) {
    return dateString;
  }
};

// Check if a notification is new (less than 24 hours old)
export const isNewNotification = (timestamp: number): boolean => {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  return (now - timestamp) < oneDayMs;
};

// Get count of new or unread notifications
export const getUnreadNotificationsCount = (notifications: any[]): number => {
  return notifications.filter(notification => !notification.read).length;
};
