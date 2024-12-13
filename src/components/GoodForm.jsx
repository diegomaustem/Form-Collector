import axios from "axios";
import { useForm } from "react-hook-form";
import validator from "validator";
import { useQueryClient, useMutation, useQuery } from "react-query";

const endPoint = "http://localhost:3000/forms";

export default function GoodForm() {
  const { data, isLoading, error } = useQuery("forms", async () => {
    return await axios.get(endPoint).then((response) => response.data);
  });

  if (error) {
    console.log("Sorry error!", error.message);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const watchPassword = watch("password");

  const queryClient = useQueryClient();
  const insertData = useMutation({
    mutationFn: async (data) => {
      await axios.post(endPoint, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
    },
  });

  const onSubmit = (data) => {
    insertData.mutate(data);
  };

  return (
    <div className="app-container">
      <div className="form-group">
        <label>Nome</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Seu nome"
          {...register("name", { required: true })}
        />
        {errors?.name?.type === "required" && (
          <p className="error-message">Name is required</p>
        )}
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          className={errors?.email && "input-error"}
          type="email"
          placeholder="Seu e-mail"
          {...register("email", {
            required: true,
            validate: (value) => validator.isEmail(value),
          })}
        />
        {errors?.email?.type === "validate" && (
          <p className="error-message">E-mail invalid</p>
        )}
        {errors?.email?.type === "required" && (
          <p className="error-message">E-mail is required.</p>
        )}
      </div>

      <div className="form-group">
        <label>Senha</label>
        <input
          className={errors?.password && "input-error"}
          type="password"
          placeholder="Senha"
          {...register("password", {
            required: true,
            minLength: 7,
            validate: (value) => value === watchPassword,
          })}
        />
        {errors?.password?.type === "required" && (
          <p className="error-message">Password is required.</p>
        )}

        {errors?.password?.type === "minLength" && (
          <p className="error-message">
            Password must have at least 7 characters.
          </p>
        )}

        {errors?.password?.type === "validate" && (
          <p className="error-message">
            Please verify your password confirmation
          </p>
        )}
      </div>

      <div className="form-group">
        <label>Confirmação de senha</label>
        <input
          className={errors?.passwordConfirmation && "input-error"}
          type="password"
          placeholder="Digite sua senha novamente"
          {...register("passwordConfirmation", {
            required: true,
            minLength: 7,
            validate: (value) => value === watchPassword,
          })}
        />
        {errors?.passwordConfirmation?.type === "required" && (
          <p className="error-message">Password confirmation is required.</p>
        )}

        {errors?.passwordConfirmation?.type === "validate" && (
          <p className="error-message">Passwords does not match.</p>
        )}

        {errors?.passwordConfirmation?.type === "minLength" && (
          <p className="error-message">
            Password confirmation must have at least 7 characters.
          </p>
        )}
      </div>

      <div className="form-group">
        <label>Profissão</label>
        <select
          {...register("profession", {
            validate: (value) => {
              return value != "0";
            },
          })}
          className={errors?.profession && "input-error"}
        >
          <option value="0">Selecione sua profissão...</option>
          <option value="developer">Desenvolvedor</option>
          <option value="other">Outra</option>
        </select>

        {errors?.profession?.type === "validate" && (
          <p className="error-message">The profession is required</p>
        )}
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="privacy-policy"
            {...register("privacyTerms", { required: true })}
          />
          <label>I agree with the privacy terms.</label>
        </div>

        {errors?.privacyTerms?.type === "required" && (
          <p className="error-message">
            You must agree with the privacy terms.
          </p>
        )}
      </div>

      <div className="form-group">
        <button onClick={() => handleSubmit(onSubmit)()}>Criar conta</button>
      </div>
    </div>
  );
}
