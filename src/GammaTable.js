import React from 'react'

const GammaTable = ({ gammaData }) => {
    // Extract unique class values
    const classValues = [...new Set(gammaData.map(item => item.class))];

    // Create an object to store the data in the desired format
    const tableData = {};
    gammaData.forEach(item => {
        tableData[item.class] = {
            mean: item.mean,
            median: item.median,
            mode: item.mode,
        };
    });

    return (
        <div>
            <h4>Gamma Stats</h4>
            <table>
                <thead>
                    <tr>
                        <th>Gamma Measures</th>
                        {classValues.map(classValue => (
                            <th key={classValue}>Class {classValue}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Gamma Mean</td>
                        {classValues.map(classValue => (
                            <td key={classValue}>{tableData[classValue].mean}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Gamma Median</td>
                        {classValues.map(classValue => (
                            <td key={classValue}>{tableData[classValue].median}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Mode</td>
                        {classValues.map(classValue => (
                            <td key={classValue}>{tableData[classValue].mode}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default GammaTable