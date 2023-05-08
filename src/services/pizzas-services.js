import config from '../../dbconfig.js';
import sql from 'mssql';

export default class PizzaService {
    getAll = async () => {
        let returnAll = null;
        console.log("Estoy en: pizzaService.getAll()")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query('Select * FROM Pizzas')
            returnAll = result.recordsets[0];
        }
        catch (error) {
            console.log(error);
        }
        return returnAll;
    }

    getById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: pizzaService.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query('SELECT * FROM Pizzas WHERE id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    insert = async (nombre, libreGluten, importe, descripcion) => {
        let returnEntity = null;
        console.log('Estoy en: pizzaService.insert')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pNombre', sql.NChar, nombre)
            .input('pLibreGluten', sql.Bit, libreGluten)
            .input('pImporte', sql.Float, importe)
            .input('pDescripcion', sql.NChar, descripcion)
            .query('INSERT INTO Pizzas (Nombre, LibreGluten, Importe, Descripcion) VALUES(@pNombre, @pLibreGluten, @pImporte, @pDescripcion)');
            returnEntity = result.rowsAffected;
        } catch (error){
            console.log(error);
        }
        return returnEntity;
    }

    update = async (id, nombre, libreGluten, importe, descripcion) => {
        let updateReturn = null;
        console.log('Estoy en: pizzaService.update')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
               .input('pId', sql.Int, id)
               .input('pNombre', sql.VarChar, nombre)
               .input('pLibreGluten', sql.Bit, libreGluten)
               .input('pImporte', sql.Float, importe)
               .input('pDescripcion', sql.VarChar, descripcion)
               .query('UPDATE Pizzas set Nombre = @pNombre, LibreGluten = @pLibreGluten, Importe = @pImporte, Descripcion = @pDescripcion FROM Pizzas WHERE id = @pId;');
            updateReturn = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return updateReturn;

    }

    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: pizzaService.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE FROM Pizzas WHERE id = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}