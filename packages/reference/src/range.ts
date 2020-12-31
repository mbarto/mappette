export type Range<Min extends number, Max extends number> = number & {
    __value__: never
    min: Min
    max: Max
}

function isInRange<Min extends number, Max extends number>(
    n: number,
    min: Min,
    max: Max,
): n is Range<Min, Max> {
    return n >= min && n <= max
}

export function range<Min extends number, Max extends number>(
    input: unknown,
    min: Min,
    max: Max,
): Range<Min, Max> {
    if (typeof input !== "number") {
        throw new Error("invalid input")
    }
    if (!isInRange(input, min, max)) {
        throw new Error(
            `input number is not between specified min ${min} and max ${max}`,
        )
    }

    return input
}
