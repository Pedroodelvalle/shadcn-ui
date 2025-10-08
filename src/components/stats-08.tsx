"use client";

import { Card, CardContent } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react";
import { DollarSign } from "lucide-react";
import * as React from "react";

const budgetData = {
  total: 50000, // Total budget disponível
  used: 32500,  // Budget utilizado
  progress: Math.round((32500 / 50000) * 100), // Progresso em %
};

const chartConfig = {
  progress: {
    label: "Budget Used",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const drawerVariants = {
    hidden: {
        y: "100%",
        opacity: 0,
        rotateX: 5,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
        },
    },
    visible: {
        y: 0,
        opacity: 1,
        rotateX: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
            staggerChildren: 0.07,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: {
        y: 20,
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
        },
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
        },
    },
};

function AddBalanceDrawer() {
    const [amount, setAmount] = React.useState("");

    const handleAddBalance = () => {
        const value = parseFloat(amount);
        if (value > 0) {
            // Aqui seria implementada a lógica para adicionar saldo
            console.log(`Adicionando $${value} ao saldo`);
            setAmount("");
        }
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-8 text-xs border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/30"
                >
                    Adicionar saldo
                </Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-fit mx-auto p-6 rounded-2xl shadow-xl">
                <motion.div
                    variants={drawerVariants as any}
                    initial="hidden"
                    animate="visible"
                    className="mx-auto w-full max-w-[340px] space-y-6"
                >
                    <motion.div variants={itemVariants as any}>
                        <DrawerHeader className="px-0 space-y-2.5">
                            <DrawerTitle className="text-2xl font-semibold flex items-center gap-2.5 tracking-tighter">
                                <motion.div variants={itemVariants as any}>
                                    <div className="p-1.5 rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 shadow-inner">
                                        <DollarSign className="w-6 h-6 text-primary" />
                                    </div>
                                </motion.div>
                                <motion.span variants={itemVariants as any}>
                                    Adicionar Saldo
                                </motion.span>
                            </DrawerTitle>
                            <motion.div variants={itemVariants as any}>
                                <DrawerDescription className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 tracking-tighter">
                                    Digite o valor que deseja adicionar ao seu saldo de campanhas.
                                </DrawerDescription>
                            </motion.div>
                        </DrawerHeader>
                    </motion.div>

                    <motion.div variants={itemVariants as any} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-sm font-medium">
                                Valor (USD)
                            </Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="pl-10 text-lg font-semibold"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants as any}>
                        <DrawerFooter className="flex flex-col gap-3 px-0">
                            <div className="w-full">
                                <Button
                                    onClick={handleAddBalance}
                                    disabled={!amount || parseFloat(amount) <= 0}
                                    className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white text-sm font-semibold tracking-wide shadow-lg shadow-primary/20 transition-all duration-500"
                                >
                                    Confirmar Adição
                                </Button>
                            </div>
                            <DrawerClose asChild>
                                <Button
                                    variant="outline"
                                    className="w-full h-11 rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-sm font-semibold transition-colors tracking-tighter"
                                >
                                    Cancelar
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </motion.div>
                </motion.div>
            </DrawerContent>
        </Drawer>
    );
}

export function CampaignBudget() {
  return (
    <Card className="p-5 w-auto">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center space-x-3.5">
          <div className="relative flex items-center justify-center">
            <ChartContainer
              config={chartConfig}
              className="h-[52px] w-[52px]"
            >
              <RadialBarChart
                data={[{ progress: budgetData.progress }]}
                innerRadius={19}
                outerRadius={33}
                barSize={6}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                  axisLine={false}
                />
                <RadialBar
                  dataKey="progress"
                  background
                  cornerRadius={9}
                  fill="#2984f6"
                  angleAxisId={0}
                />
              </RadialBarChart>
            </ChartContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-foreground">
                {budgetData.progress}%
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <dd className="text-xs font-medium text-foreground">
              ${budgetData.used.toLocaleString()} / ${budgetData.total.toLocaleString()}
            </dd>
            <dt className="text-xs text-muted-foreground">
              Campaign Budget
            </dt>
          </div>
        </div>
        <AddBalanceDrawer />
      </CardContent>
    </Card>
  );
}

export default function Stats08() {
  return (
    <div className="flex items-center justify-center p-10 w-full">
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
        {/* Original Stats08 component content would go here */}
      </dl>
    </div>
  );
}
