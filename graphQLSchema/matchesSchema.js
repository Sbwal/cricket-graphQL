const {
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLInt,
} = require('graphql');
const MatchModel = require('../models/matches');

const MatchType = new GraphQLObjectType({
    name: "Match",
    fields: {
        equation: { type: GraphQLString },
        teamscores: { type: GraphQLString },
        daynight: { type: GraphQLString },
        gmt_offset: { type: GraphQLString },
        group: { type: GraphQLString },
        league: { type: GraphQLString },
        live: { type: GraphQLString },
        livecoverage: { type: GraphQLString },
        match_Id: { type: GraphQLString },
        matchfile: { type: GraphQLString },
        matchnumber: { type: GraphQLString },
        matchresult: { type: GraphQLString },
        matchstatus: { type: GraphQLString },
        matchdate_gmt: { type: GraphQLString },
        matchdate_ist: { type: GraphQLString },
        matchdate_local: { type: GraphQLString },
        matchtime_gmt: { type: GraphQLString },
        matchtime_ist: { type: GraphQLString },
        matchtime_local: { type: GraphQLString },
        end_matchdate_gmt: { type: GraphQLString },
        end_matchdate_ist: { type: GraphQLString },
        end_matchdate_local: { type: GraphQLString },
        end_matchtime_gmt: { type: GraphQLString },
        end_matchtime_ist: { type: GraphQLString },
        end_matchtime_local: { type: GraphQLString },
        matchtype: { type: GraphQLString },
        priority: { type: GraphQLString },
        recent: { type: GraphQLString },
        series_Id: { type: GraphQLString },
        seriesname: { type: GraphQLString },
        series_short_display_name: { type: GraphQLString },
        series_type: { type: GraphQLString },
        series_start_date: { type: GraphQLString },
        series_end_date: { type: GraphQLString },
        toss_elected_to: { type: GraphQLString },
        toss_won_by: { type: GraphQLString },
        parent_id: { type: GraphQLString },
        parent_name: { type: GraphQLString },
        has_standings: { type: GraphQLString },
        match_ordinal: { type: GraphQLString },
        coverage_level_id: { type: GraphQLString },
        coverage_level: { type: GraphQLString },
        has_scores: { type: GraphQLString },
        has_comm: { type: GraphQLString },
        teama_hassquads: { type: GraphQLString },
        teamb_hassquads: { type: GraphQLString },
        matchstatus_Id: { type: GraphQLString },
        comp_type: { type: GraphQLString },
        comp_type_id: { type: GraphQLString },
        championship_id: { type: GraphQLString },
        championship_name: { type: GraphQLString },
        stage: { type: GraphQLString },
        teama: { type: GraphQLString },
        teama_short: { type: GraphQLString },
        teama_Id: { type: GraphQLString },
        teamb: { type: GraphQLString },
        teamb_short: { type: GraphQLString },
        teamb_Id: { type: GraphQLString },
        tour_Id: { type: GraphQLString },
        tourname: { type: GraphQLString },
        upcoming: { type: GraphQLString },
        venue: { type: GraphQLString },
        venue_Id: { type: GraphQLString },
        winningmargin: { type: GraphQLString },
        winningteam_Id: { type: GraphQLString },
        SeriesStatus: { type: GraphQLString },
        Isso: { type: GraphQLString },
        audience_id: { type: GraphQLString },
        audience_type: { type: GraphQLString }
    }
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            getMatchById: {
                type: MatchType,
                args: {
                    match_Id: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: async (root, args, context, info) => {
                    console.log(`In getMatchById :: match_id: ${args.match_Id}`);
                    return await MatchModel.findOne({ match_Id: args.match_Id }).exec();
                }
            },
            getMatchesByDateRange: {
                type: GraphQLList(MatchType),
                args: {
                    start_date: { type: GraphQLNonNull(GraphQLString) },
                    end_date: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: async (root, args, context, info) => {
                    let matches = await MatchModel.find().exec();
                    const start_date = new Date(args.start_date);
                    const end_date = new Date(args.end_date);
                    matches = matches.filter(match => {
                        const date = new Date(match.matchdate_ist);
                        return date >= start_date && date <= end_date;
                    })
                    console.log(`In getMatchesByDateRange :: start_date: ${start_date}, end_date: ${end_date}`);
                    return matches;
                }
            },
            getmatchesByPagination: {
                type: GraphQLList(MatchType),
                args: {
                    pagination: { type: GraphQLNonNull(GraphQLInt) }
                },
                resolve: async (root, args, context, info) => {
                    let matches = await MatchModel.find().exec();
                    console.log(`In getmatchesByPagination :: pagination: ${args.pagination}`);
                    const startIndex = (args.pagination - 1) * 10;
                    const endIndex = startIndex + 9;
                    matches = matches.slice(startIndex, endIndex);
                    return matches;
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            updateMatchField: {
                type: MatchType,
                args: {
                    match_Id: { type: GraphQLNonNull(GraphQLString) },
                    teamscores: { type: GraphQLString },
                    daynight: { type: GraphQLString },
                    gmt_offset: { type: GraphQLString },
                    group: { type: GraphQLString },
                    league: { type: GraphQLString },
                    live: { type: GraphQLString },
                    livecoverage: { type: GraphQLString },
                    match_Id: { type: GraphQLString },
                    matchfile: { type: GraphQLString },
                    matchnumber: { type: GraphQLString },
                    matchresult: { type: GraphQLString },
                    matchstatus: { type: GraphQLString },
                    matchdate_gmt: { type: GraphQLString },
                    matchdate_ist: { type: GraphQLString },
                    matchdate_local: { type: GraphQLString },
                    matchtime_gmt: { type: GraphQLString },
                    matchtime_ist: { type: GraphQLString },
                    matchtime_local: { type: GraphQLString },
                    end_matchdate_gmt: { type: GraphQLString },
                    end_matchdate_ist: { type: GraphQLString },
                    end_matchdate_local: { type: GraphQLString },
                    end_matchtime_gmt: { type: GraphQLString },
                    end_matchtime_ist: { type: GraphQLString },
                    end_matchtime_local: { type: GraphQLString },
                    matchtype: { type: GraphQLString },
                    priority: { type: GraphQLString },
                    recent: { type: GraphQLString },
                    series_Id: { type: GraphQLString },
                    seriesname: { type: GraphQLString },
                    series_short_display_name: { type: GraphQLString },
                    series_type: { type: GraphQLString },
                    series_start_date: { type: GraphQLString },
                    series_end_date: { type: GraphQLString },
                    toss_elected_to: { type: GraphQLString },
                    toss_won_by: { type: GraphQLString },
                    parent_id: { type: GraphQLString },
                    parent_name: { type: GraphQLString },
                    has_standings: { type: GraphQLString },
                    match_ordinal: { type: GraphQLString },
                    coverage_level_id: { type: GraphQLString },
                    coverage_level: { type: GraphQLString },
                    has_scores: { type: GraphQLString },
                    has_comm: { type: GraphQLString },
                    teama_hassquads: { type: GraphQLString },
                    teamb_hassquads: { type: GraphQLString },
                    matchstatus_Id: { type: GraphQLString },
                    comp_type: { type: GraphQLString },
                    comp_type_id: { type: GraphQLString },
                    championship_id: { type: GraphQLString },
                    championship_name: { type: GraphQLString },
                    stage: { type: GraphQLString },
                    teama: { type: GraphQLString },
                    teama_short: { type: GraphQLString },
                    teama_Id: { type: GraphQLString },
                    teamb: { type: GraphQLString },
                    teamb_short: { type: GraphQLString },
                    teamb_Id: { type: GraphQLString },
                    tour_Id: { type: GraphQLString },
                    tourname: { type: GraphQLString },
                    upcoming: { type: GraphQLString },
                    venue: { type: GraphQLString },
                    venue_Id: { type: GraphQLString },
                    winningmargin: { type: GraphQLString },
                    winningteam_Id: { type: GraphQLString },
                    SeriesStatus: { type: GraphQLString },
                    Isso: { type: GraphQLString },
                    audience_id: { type: GraphQLString },
                    audience_type: { type: GraphQLString }
                },
                resolve: async (root, args, context, info) => {
                    console.log(`In updateMatchField :: args: ${JSON.stringify(args)}`);
                    if(Object.keys(args).length < 2) return Promise.reject(new Error('Specify atleast one field'));
                    return await MatchModel.findOneAndUpdate(
                        { match_Id: args.match_Id },
                        args,
                        {new: true}
                    ).exec()
                }
            }
        }
    })
})

module.exports = schema;