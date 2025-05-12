import React from 'react'

interface Props{
  parsed: any[][],
  
  
}
const DataPreview = ({parsed}: Props) => {
  return (
    <div>
      <div className="w-1/2">
                          {parsed && parsed.length > 0 && (
                            <div>
                              <h3 className="font-bold mb-2">
                                Customer File Preview:
                              </h3>
                              <table className="table-auto border w-full text-sm">
                                <tbody>
                                  {parsed.slice(0, 5).map((row, i) => (
                                    <tr key={i}>
                                      {row
                                        .slice(0, 6)
                                        .map((cell: any, j: number) => (
                                          <td
                                            key={j}
                                            className="border px-2 py-1"
                                          >
                                            {cell}
                                            {j === 5 && row.length > 6 && "..."}
                                          </td>
                                        ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <p className="text-sm text-gray-500 mt-2">
                                Showing first 5 rows and 6 columns of{" "}
                                {parsed.length} rows
                              </p>
                            </div>
                          )}
                        </div>
    </div>
  )
}

export default DataPreview