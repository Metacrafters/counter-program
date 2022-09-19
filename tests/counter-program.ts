import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { CounterProgram } from "../target/types/counter_program";
import { Keypair, SystemProgram } from "@solana/web3.js";

describe("counter-program", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.env()
  const program = anchor.workspace.CounterProgram as Program<CounterProgram>;

  let counter = Keypair.generate()

  it("Create counter account!", async () => {
    // Add your test here.
    const tx = await program.methods.createCounter()
    .accounts({
      counter: counter.publicKey,
      authority: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    })
    .signers([counter])
    .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Incrementing counter", async () => {
    // increment test goes here
    const tx = await program.methods.increment()
    .accounts({

    })
    .signers([])
    .rpc()
    console.log("Increment tx signature: ", tx)
  })
});
