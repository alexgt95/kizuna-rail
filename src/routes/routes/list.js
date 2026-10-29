import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

// No filter (or "all") matches everything, otherwise compare ignoring case
const matchesFilter = (filter, value) => {
    if (!filter || filter === 'all') return true;
    return filter.toLowerCase() === value.toLowerCase();
};

export default async (req, res) => {
    const { region, season } = req.query;

    const regions = await getListOfRegions();
    const allRoutes = await getAllRoutes();
    const seasons = await getListOfSeasons();

    const routes = allRoutes.filter(route =>
        matchesFilter(region, route.region) && matchesFilter(season, route.bestSeason)
    );

    res.render('routes/list', {
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons
    });
};
