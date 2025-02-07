import db from "../config/db.js";

export const loginModel = (nim) => {
  const SQLQuery = `SELECT[id]
                        ,[username]
                        ,[nim]
                        ,[password]
                        ,[createdAt]
                    FROM [TEST].[dbo].[users]
                    WHERE nim = '${nim}'`;
  return db.query(SQLQuery);
};

export const loginModelNav = (id) => {
  const SQLQuery = `SELECT [id]
                        ,[username]
                        ,[nim]    
                    FROM [TEST].[dbo].[users]
                    WHERE id = '${id}'`;
  return db.query(SQLQuery);
};
