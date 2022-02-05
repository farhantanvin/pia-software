using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pia_server_side_app.Models.Contexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<GroupLedger> GroupLedgers { get; set; }
        public virtual DbSet<AccountType> AccountTypes { get; set; }
        public DbSet<SubGroupLedger> SubGroupLedgers { get; set; }
        public DbSet<ControlLedger> ControlLedgers { get; set; }
        public virtual  DbSet<AccountLedger> AccountLedgers { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<DepartmentType> DepartmentTypes { get; set; }
        public DbSet<Branch> Branchs { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<MeasurementUnit> MeasurementUnits { get; set; }
        public DbSet<Condition> Conditions { get; set; }
        public virtual DbSet<PurchaseRequisition> PurchaseRequisitions { get; set; }
        public virtual DbSet<PurchaseRequisitionDetail> PurchaseRequisitionDetails { get; set; }

    }
}

