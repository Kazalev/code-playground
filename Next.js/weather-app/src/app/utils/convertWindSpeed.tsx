export function converWindSpeed(speedInMetersPerSecond: number): string {
    const speedInKilometersPerHpur = speedInMetersPerSecond * 3.6
    return `${speedInKilometersPerHpur.toFixed(0)}km/h`
}
