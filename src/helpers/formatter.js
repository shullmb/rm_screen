export const formatUSD = (amount, inputFormat='C') => {
	// inputFormat of 'C' for vlues in cents, I for integer/whole dollars
	var convertedAmount = inputFormat === "I" ? amount : Math.ceil(amount / 100);
	return convertedAmount.toFixed(2)
} 