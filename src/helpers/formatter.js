export const formatUSD = (amount, inputFormat='C') => {
	// inputFormat of 'C' for vlues in cents, I for integer/whole dollars
	var returnAmt = inputFormat === "I" ? amount : Math.ceil(amount / 100);
	return (returnAmt.toFixed(2))
} 