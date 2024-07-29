"use client";
import React, {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import Link from "next/link";
import {loginUser} from "@/app/actions/auth";
import {useRouter} from "next/navigation";
import {toast} from "@/components/ui/use-toast";
const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required.",
      invalid_type_error: "Email is invalid.",
    })
    .email(),

  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const result = await loginUser(values);
    if (result?.accessToken) {
      setLoading(false);
      toast({
        title: "Logged in successfully!",
      });
      router.push("/dashboard");
    } else {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "An error occured!",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-10/12 gap-4">
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
          {loading && <Spinner />}
          Sign In
        </Button>
        <p className="px-6 text-sm text-center align-bottom mt-2">
          Need to create an account?
          <Link href="/signup" className="hover:underline text-green-700 font-bold ml-1">
            Signup Here
          </Link>
          .
        </p>
      </form>
    </Form>
  );
};

export default SignInForm;
