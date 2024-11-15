export const formatNumber = (
    value,
    locale = 'en-US',
    options = { style: 'currency', currency: 'USD' }
) => {
    return new Intl.NumberFormat(locale, options).format(value).slice(1);
}
