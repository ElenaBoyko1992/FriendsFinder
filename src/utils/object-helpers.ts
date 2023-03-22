export const updateObjectInArray = (items: Array<any>, itemId: number, objPropName: string, newObjProps: {}) => {
    return items.map((item: any) => {
        if (item[objPropName] === itemId) {
            return {...item, ...newObjProps}
        }
        return item
    })
}