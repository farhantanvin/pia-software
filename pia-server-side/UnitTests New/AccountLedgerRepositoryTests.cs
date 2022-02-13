using pia_server_side_app.Models;
using pia_server_side_app.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using Xunit;

namespace UnitTests
{
   
    public class AccountLedgerRepositoryTests
    {
        private readonly IAccountLedgerRepository accountLedgerRepository;

        [Fact]
        public async void AccountLedgerGet_works()
        {
            //Arrange
            var accountLedgerExpected = new List<AccountLedgerVM>()
               {
                   new AccountLedgerVM { AccountLedgerName = "Acc1",
                    AccountTypeName= "Physical Asset",
                    GroupLedgerName= "Desktop",
                    SubGroupLedgerName ="Custom Desk 1",
                    ControlLedgerName = "Control 2"},

                   new AccountLedgerVM { AccountLedgerName = "Acc2",
                    AccountTypeName= "Logical Asset",
                    GroupLedgerName= "Email",
                    SubGroupLedgerName ="Google",
                    ControlLedgerName = "Control 1"},
               };

            //Act
            var accountLedgerActual = await accountLedgerRepository.Get();

            //Assert
            Assert.Equal(accountLedgerExpected, accountLedgerActual);
        }
    }
}
