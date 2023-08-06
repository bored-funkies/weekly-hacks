enum  AggregationType{
    GroupBy,
    Count,
    Sum,
    Min,
    Max
}

interface Aggregation{
    column: string,
    type: AggregationType
}

export { type Aggregation as default, AggregationType };