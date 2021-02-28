const routeDataService = require('./routeData')

const routes = [
    'products',
    'add-articles',
    'categories'
]

export const showMenuBarOnRoutes = () => {
    const routeData = routeDataService.routeData()

    return routeData.filter(item => routes.includes(item.id))
}