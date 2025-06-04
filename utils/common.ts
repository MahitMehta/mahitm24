export const getFormattedDate = (date: Date) => {
	const hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const ampm = hours >= 12 ? "pm" : "am";
	const formattedHours = hours % 12 || 12;
	return `${formattedHours}:${minutes}${ampm} ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const isValidEmail = (email: string) => {
	return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/.test(email.toUpperCase());
};
