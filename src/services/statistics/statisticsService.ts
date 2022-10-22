import sequelize, { Op } from "sequelize";
import { Order } from "../../database/models/models";

export default class StatisticsService {
  static async getReport(dateRange) {
    try {
      const startDate = dateRange[0];
      let endDate = dateRange[1];

      const delta = Math.ceil(
        Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime()) /
          (1000 * 3600 * 24)
      );

      const newEndDate = new Date(endDate);
      newEndDate.setDate(newEndDate.getDate() + 1);
      endDate = newEndDate.toISOString();

      return await Order.findAll({
        where: {
          date: {
            [Op.gte]: new Date(startDate.split("T")[0]),
            [Op.lte]: new Date(endDate.split("T")[0]),
          },
        },
        attributes: [
          [sequelize.fn("DATE", sequelize.col("date")), "dateValue"],
          [sequelize.fn("COUNT", sequelize.col("items")), "count"],
        ],
        group: [sequelize.fn("DATE", sequelize.col("date")), "dateValue"],
      });
    } catch (e) {
      console.log(e);
    }
  }
}

// function getReport({ startDate, endDate }, value) {
//   const delta = Math.ceil(
//     Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime()) /
//     (1000 * 3600 * 24)
//   );
//
//   const newEndDate = new Date(endDate);
//   newEndDate.setDate(newEndDate.getDate() + 1);
//   endDate = newEndDate.toISOString();
//
//   const terms = value
//     ? await QueryStatistics.aggregate([
//       {
//         $match: {
//           date: {
//             $gte: new Date(startDate.split("T")[0]),
//             $lte: new Date(endDate.split("T")[0]),
//           },
//           value: value,
//         },
//       },
//       {
//         $group: {
//           _id: "$value",
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { count: -1 } },
//       { $project: { search_term: "$_id", _id: 0, count: 1 } },
//     ])
//     : await QueryStatistics.aggregate([
//       {
//         $match: {
//           date: {
//             $gte: new Date(startDate.split("T")[0]),
//             $lte: new Date(endDate.split("T")[0]),
//           },
//         },
//       },
//       {
//         $group: {
//           _id: "$value",
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { count: -1 } },
//       { $project: { search_term: "$_id", _id: 0, count: 1 } },
//     ]);
//   const report =
//     delta === 0
//       ? await QueryStatistics.aggregate([
//         {
//           $match: {
//             date: {
//               $gte: new Date(startDate.split("T")[0]),
//               $lte: new Date(endDate.split("T")[0]),
//             },
//           },
//         },
//         {
//           $group: {
//             _id: {
//               year: { $year: "$date" },
//               day: { $dayOfYear: "$date" },
//               hour: { $hour: "$date" },
//             },
//             count: { $sum: 1 },
//           },
//         },
//         { $project: { date_of_use: "$_id", _id: 0, count: 1 } },
//         { $sort: { "date_of_use.hour": 1 } },
//       ])
//       : delta > 31
//         ? await QueryStatistics.aggregate([
//           {
//             $match: {
//               date: {
//                 $gte: new Date(startDate.split("T")[0]),
//                 $lte: new Date(endDate.split("T")[0]),
//               },
//             },
//           },
//           {
//             $group: {
//               _id: {
//                 year: { $year: "$date" },
//                 month: { $month: "$date" },
//               },
//               count: { $sum: 1 },
//             },
//           },
//           { $project: { date_of_use: "$_id", _id: 0, count: 1 } },
//           { $sort: { "date_of_use.month": 1 } },
//         ])
//         : await QueryStatistics.aggregate([
//           {
//             $match: {
//               date: {
//                 $gte: new Date(startDate.split("T")[0]),
//                 $lte: new Date(endDate.split("T")[0]),
//               },
//             },
//           },
//           {
//             $group: {
//               _id: {
//                 year: { $year: "$date" },
//                 day: { $dayOfYear: "$date" },
//               },
//               count: { $sum: 1 },
//             },
//           },
//           { $project: { date_of_use: "$_id", _id: 0, count: 1 } },
//           { $sort: { "date_of_use.day": 1 } },
//         ]);
//   return { terms, report };
