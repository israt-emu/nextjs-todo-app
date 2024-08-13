"use client";
import React, {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {createUser} from "@/app/actions/user";
import {useRouter} from "next/navigation";
import Spinner from "@/components/ui/Spinner";
import Link from "next/link";
import {toast} from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string({
      required_error: "Email is required.",
      invalid_type_error: "Email is invalid.",
    })
    .email(),
  phone: z.string({
    message: "Phone is required",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const data = await createUser(values);
    setLoading(false);
    if (data?.success) {
      toast({
        title: "Account created successfully!",
      });
      router.push("/signin");
    } else {
      toast({
        variant: "destructive",
        title: "An error occured!",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-11/12 md:w-10/12 gap-4 mb-3 md:mb-0">
        <div className="">
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                {/* <FormLabel>Username</FormLabel> */}
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" my-3">
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                {/* <FormLabel>Username</FormLabel> */}
                <FormControl>
                  <Input placeholder="Email" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="my-3">
          <FormField
            control={form.control}
            name="phone"
            render={({field}) => (
              <FormItem>
                {/* <FormLabel>Username</FormLabel> */}
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="my-3">
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                {/* <FormLabel>Username</FormLabel> */}
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          {loading && <Spinner color="white" />}
          Sign Up
        </Button>
        <p className="px-6 text-xs md:text-sm text-center  align-bottom mt-2">
          Already have an account?
          <Link href="/signin" className="hover:underline text-green-700 font-bold ml-1">
            Please Login
          </Link>
          .
        </p>
      </form>
    </Form>
  );
};

export default SignUpForm;
