export const useStringUtils = () => {

    const buildChatId = (date, displayName) => {
        const formatted = useDateFormat(date, 'YYYY-MM-DD-HH-mm-ss')
        return `${formatted.value}${displayName}`
    }

    return {
        buildChatId
    }
}
