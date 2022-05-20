import { Injectable } from '@nestjs/common';
import { VipPointEntity } from 'src/entity/vip_point.entity';
import { getManager } from 'typeorm';

@Injectable()
export class VipPointService {

    async getvippointbyCompany(company_name: string){
        try {
            const model = await 
            getManager().query(`
            select datavip.customer_name as "COMPANY_NAME", datavip.status as "STATUS", sum(datavip.vip_points) as "VIP_POINT" from (
                select distinct 
                vb.customer_name, 
                vb.status,
                vb.pid,
                vb.enduser as "END_USER",
                vb.productname as "PRODUCT_NAME", 
                vb.projectname as "PROJECT_NAME", 
                vb.customerpo as "CUSTOMER_PO", 
                vb.deliverydate as "DELIVERY_DATE", 
                vb.invoicedate as "INVOICE_DATE",
                vb.paymentdate as "PAYMENT_DATE",
                vb.revenue as "REVENUE",
                vb.vip_points
                from vti_bpperformance vb
                 where vb.customer_name = '${company_name}'
                order by vb.productname ASC
                ) as datavip
                group by datavip.customer_name, datavip.status
            `)
            
            if (model.length !== 0 ) {
                return model
            } else {
                return []
            }
            
        } catch (error) {
            throw new Error(error.message);
        }
      }

      async getAllvippoint(){
        try {
            const model = await 
            getManager().query(`
            select distinct vb.customer_name as "COMPANY_NAME", 
            vb.status, sum(vb.vip_points) as "VIP_POINT", 
            sum(vb.revenue) as "REVENUE" 
            from vti_bpperformance vb
            group by vb.customer_name, vb.status
            order by vb.customer_name
            `)
            
            if (model.length !== 0 ) {
                return model
            } else {
                return []
            }
            
        } catch (error) {
            throw new Error(error.message);
        }
      }

      async getrevenuebyCompany(company_name: string){
        try {
            const model = await 
            getManager().query(`
            select datavip.customer_name as "COMPANY_NAME", datavip.status as "STATUS", sum(datavip.revenue) as "REVENUE" from (
                select distinct vb.customer_name, 
                vb.status,
                vb.pid,
                vb.enduser as "END_USER",
                vb.productname as "PRODUCT_NAME", 
                vb.projectname as "PROJECT_NAME", 
                vb.customerpo as "CUSTOMER_PO", 
                vb.deliverydate as "DELIVERY_DATE", 
                vb.invoicedate as "INVOICE_DATE",
                vb.paymentdate as "PAYMENT_DATE",
                vb.revenue,
                vb.vip_points
                from vti_bpperformance vb
                where vb.customer_name = '${company_name}'
                order by vb.productname ASC
                ) as datavip
                group by datavip.customer_name, datavip.status
            `)
            
            if (model.length !== 0 ) {
                return model
            } else {
                return []
            }
            
        } catch (error) {
            throw new Error(error.message);
        }
      }

      async getalldatavip(company_name: string){
        try {
            const model = await 
            getManager().query(`
            select distinct 
            vb.customer_name as "COMPANY_NAME", 
            vb.status as "STATUS", 
            vb.enduser as "END_USER",
            vb.productname as "PRODUCT_NAME", 
            vb.projectname as "PROJECT_NAME", 
            vb.customerpo as "CUSTOMER_PO", 
            vb.deliverydate as "DELIVERY_DATE", 
            vb.invoicedate as "INVOICE_DATE",
            vb.paymentdate as "PAYMENT_DATE",
            vb.revenue as "REVENUE",
            vb.vip_points as "VIP_POINTS",
            vb.special_bid as "SPECIAL_BID"
            from vti_bpperformance vb
            where vb.customer_name = '${company_name}' and
            date_part('year',TO_DATE(vb.deliverydate, 'yyyy-mm-dd'))=date_part('year',current_date-INTERVAL '1 year') and
            date_part('year',TO_DATE(vb.paymentdate, 'yyyy-mm-dd'))=date_part('year',current_date-INTERVAL '1 year')
            order by vb.productname ASC
            `)
            
            if (model.length !== 0 ) {
                return model
            } else {
                return []
            }
            
        } catch (error) {
            throw new Error(error.message);
        }
      }

      async getAllRevenue(){
        try {
            const model = await 
            getManager().query(`
            select vb.customer_name as "COMPANY_NAME",vb.productname , vb.status, sum(vb.revenue) as "REVENUE" from vti_bpperformance vb
            group by vb.customer_name,vb.productname , vb.status
            order by vb.productname asc
            `)
            
            if (model.length !== 0 ) {
                return model
            } else {
                return []
            }
            
        } catch (error) {
            throw new Error(error.message);
        }
      }

      async filter(data){
        let where_array = [];
        let where;
        if (data.productname) {
            where = "vb.productName LIKE '%" + data.productname + "%'";
            where_array.push(where);
        }

        if (data.customer_name) {
            where = "vb.customer_name LIKE '%" + data.customer_name + "%'";
            where_array.push(where);
        }
        if (data.status) {
            where = "vb.status LIKE '%" + data.status + "%'";
            where_array.push(where);
        }

        if (data.projectname) {
            where = "vb.projectname LIKE '%" + data.projectname + "%'";
            where_array.push(where);
        }

        if (data.customerpo) {
            where = "vb.customerpo LIKE '%" + data.customerpo + "%'";
            where_array.push(where);
        }

        if (data.pid) {
            where = "vb.pid LIKE '%" + data.pid + "%'";
            where_array.push(where);
        }   
        
        if (data.enduser) {
            where = "vb.enduser LIKE '%" + data.enduser + "%'";
            where_array.push(where);
        }

        if (data.DELIVERY_DATE_FROM !== '' && data.DELIVERY_DATE_TO === ''){
            where = "TO_DATE(vb.deliverydate, 'yyyy-mm-dd') >= TO_DATE('" + data.DELIVERY_DATE_FROM + "','yyyy-mm-dd') AND TO_DATE(vb.deliverydate, 'yyyy-mm-dd') <= TO_DATE('" + data.DELIVERY_DATE_TO + "','yyyy-mm-dd')";
            where_array.push(where);
        } else if(data.DELIVERY_DATE_TO !== '' && data.DELIVERY_DATE_FROM === ''){
            where = "TO_DATE(vb.deliverydate, 'yyyy-mm-dd') >= TO_DATE('" + data.DELIVERY_DATE_TO + "','yyyy-mm-dd') AND TO_DATE(vb.deliverydate, 'yyyy-mm-dd') <= TO_DATE('" + data.DELIVERY_DATE_FROM + "','yyyy-mm-dd')";
            where_array.push(where);
        } else if(data.DELIVERY_DATE_TO !== '' && data.DELIVERY_DATE_FROM !== ''){
            where = "TO_DATE(vb.deliverydate, 'yyyy-mm-dd') >= TO_DATE('" + data.DELIVERY_DATE_FROM + "','yyyy-mm-dd') AND TO_DATE(vb.deliverydate, 'yyyy-mm-dd') <= TO_DATE('" + data.DELIVERY_DATE_TO + "','yyyy-mm-dd')";
            where_array.push(where);
        }

        if (data.PAYMENT_DATE_FROM !== '' && data.PAYMENT_DATE_TO === ''){
            where = "TO_DATE(vb.paymentdate, 'yyyy-mm-dd') >= TO_DATE('" + data.PAYMENT_DATE_FROM + "','yyyy-mm-dd') AND TO_DATE(vb.paymentdate, 'yyyy-mm-dd') <= TO_DATE('" + data.PAYMENT_DATE_TO + "','yyyy-mm-dd')";
            where_array.push(where);
        } else if(data.PAYMENT_DATE_TO !== '' && data.PAYMENT_DATE_FROM === ''){
            where = "TO_DATE(vb.paymentdate, 'yyyy-mm-dd') >= TO_DATE('" + data.PAYMENT_DATE_TO + "','yyyy-mm-dd') AND TO_DATE(vb.paymentdate, 'yyyy-mm-dd') <= TO_DATE('" + data.PAYMENT_DATE_FROM + "','yyyy-mm-dd')";
            where_array.push(where);
        } else if(data.PAYMENT_DATE_TO !== '' && data.PAYMENT_DATE_FROM !== ''){
            where = "TO_DATE(vb.paymentdate, 'yyyy-mm-dd') >= TO_DATE('" + data.PAYMENT_DATE_FROM + "','yyyy-mm-dd') AND TO_DATE(vb.paymentdate, 'yyyy-mm-dd') <= TO_DATE('" + data.PAYMENT_DATE_TO + "','yyyy-mm-dd')";
            where_array.push(where);
        }

        const model = await 
        getManager().query(`
        select distinct vb.customer_name as "COMPANY_NAME", 
        vb.status as "STATUS", 
        vb.pid as "PID", 
        vb.enduser as "END_USER", 
        vb.productname as "PRODUCT_NAME", 
        vb.projectname as "PROJECT_NAME", 
        vb.customerpo as "CUSTOMER_PO", 
        vb.deliverydate as "DELIVERY_DATE", 
        vb.invoicedate as "INVOICE_DATE",
        vb.paymentdate as "PAYMENT_DATE",
        vb.revenue as "REVENUE",
        vb.vip_points as "VIP_POINTS",
        vb.special_bid as "SPECIAL_BID"
        from vti_bpperformance vb
        where ${where_array.join(" AND ")}
        order by vb.productname ASC
        `)
        
        if (model.length !== 0 ) {
            return model
        } else {
            return []
        }
        
      }

}
