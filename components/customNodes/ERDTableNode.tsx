"use client";
import React from "react";
import { KeyRound } from "lucide-react";
import { Handle, Position } from "reactflow";
import { RFStore } from "@/hooks/NodeStore";

const ERDTableNode = ({ data }: any) => {
  const { rowTypes } = RFStore();
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-foreground-muted overflow-hidden">
          <thead
            className="text-md text-center text-white text-md p-5"
            style={{ backgroundColor: "rgb(0,0,0)" }}
          >
            <tr>
              <th className="px-3 py-1" colSpan={5}>
                {data.label}
              </th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {data.rows &&
              data.rows.map((row: any) => (
                <tr
                  key={row.title}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th className="h-4 w-4 pl-2">
                    {/* {col.key && <KeyRound className="h-3 w-3" />} */}
                  </th>
                  <td
                    scope="row"
                    className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                  >
                    {row.title}
                  </td>
                  <td className="px-3 py-2">
                    {
                      rowTypes?.find((type) => type._id === row.rowTypeId)
                        ?.title
                    }{" "}
                    {row.nullable == true ? <sup>🅽</sup> : <></>}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Handle type="source" position={Position.Top} id="a" />
        <Handle type="source" position={Position.Right} id="b" />
        <Handle type="source" position={Position.Bottom} id="c" />
        <Handle type="source" position={Position.Left} id="d" />
      </div>
    </>
  );
};

export default ERDTableNode;
