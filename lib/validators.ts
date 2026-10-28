export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

export function validateContactForm(input: ContactFormInput): ValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};

  const name = input.name?.trim() || '';
  if (!name) {
    errors.name = 'Operator name or handle is required.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const email = input.email?.trim() || '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = 'Transmission recipient/sender email is required.';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Invalid encrypted transmission email format.';
  }

  const subject = input.subject?.trim() || '';
  if (!subject) {
    errors.subject = 'Subject line or transmission header is required.';
  } else if (subject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }

  const message = input.message?.trim() || '';
  if (!message) {
    errors.message = 'Payload body or transmission message cannot be empty.';
  } else if (message.length < 10) {
    errors.message = 'Payload message must be at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
