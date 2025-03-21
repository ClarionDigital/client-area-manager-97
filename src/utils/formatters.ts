
/**
 * Utility functions for formatting data
 */

/**
 * Format a CPF number with dots and dash
 */
export const formatCpf = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

/**
 * Format a phone number with parentheses and dash
 */
export const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};

/**
 * Format a date in DD/MM/YYYY format
 */
export const formatDate = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})\d+?$/, '$1');
};

/**
 * Validate a CPF number
 */
export const validateCpf = (cpf: string): boolean => {
  // Remove non-digits
  const unformattedCpf = cpf.replace(/\D/g, '');
  
  if (unformattedCpf.length !== 11) {
    return false;
  }
  
  // Check if all digits are the same
  if (/^(\d)\1+$/.test(unformattedCpf)) {
    return false;
  }
  
  // CPF validation algorithm
  let sum = 0;
  let remainder;
  
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(unformattedCpf.substring(i - 1, i)) * (11 - i);
  }
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(unformattedCpf.substring(9, 10))) {
    return false;
  }
  
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(unformattedCpf.substring(i - 1, i)) * (12 - i);
  }
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(unformattedCpf.substring(10, 11))) {
    return false;
  }
  
  return true;
};

/**
 * Validate an email address
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate a phone number
 */
export const validatePhone = (phone: string): boolean => {
  const unformattedPhone = phone.replace(/\D/g, '');
  return unformattedPhone.length >= 10 && unformattedPhone.length <= 11;
};

/**
 * Validate a date in DD/MM/YYYY format
 */
export const validateDate = (date: string): { isValid: boolean; message?: string } => {
  if (!date) {
    return { isValid: false, message: "Data obrigatória" };
  }
  
  // Check format DD/MM/YYYY
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/;
  if (!dateRegex.test(date)) {
    return { isValid: false, message: "Formato inválido (DD/MM/AAAA)" };
  }
  
  // Check if date is valid
  const parts = date.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  
  const dateObj = new Date(year, month, day);
  
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() !== month ||
    dateObj.getDate() !== day
  ) {
    return { isValid: false, message: "Data inválida" };
  }
  
  // Check if date is not in the future
  const today = new Date();
  if (dateObj > today) {
    return { isValid: false, message: "Data não pode ser futura" };
  }
  
  // Check if person is at least 18 years old
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  
  if (dateObj > eighteenYearsAgo) {
    return { isValid: false, message: "Você deve ter pelo menos 18 anos" };
  }
  
  return { isValid: true };
};

/**
 * Format a matricula number with validator
 */
export const formatMatricula = (value: string) => {
  return value.replace(/\D/g, '').substring(0, 10);
};

/**
 * Generate a preview URL for the card
 */
export const generateCardPreviewUrl = (nome: string, nomeCompleto: string, matricula: string, fotoUrl: string | null): string => {
  const cardId = matricula.startsWith("3") ? "3" : "7";
  
  return `https://areadocliente.alternativacard.com/up/card-light.php?nome=${encodeURIComponent(nome)}&nome_completo=${encodeURIComponent(nomeCompleto)}&matricula=${encodeURIComponent(matricula)}&foto=${fotoUrl ? encodeURIComponent(fotoUrl) : ""}&id=${cardId}&keep_case=true`;
};
